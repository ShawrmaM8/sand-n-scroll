import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Upload, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EditProfileDialogProps {
  profile: {
    username: string;
    description: string;
    country: string;
    avatar: string;
  };
  onSave: (profile: any) => void;
}

export default function EditProfileDialog({ profile, onSave }: EditProfileDialogProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: language === 'ar' ? 'يجب تسجيل الدخول' : 'You must be logged in',
          variant: "destructive",
        });
        return;
      }

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          description: formData.description,
          country: formData.country,
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      onSave({
        ...formData,
        avatar: formData.username.charAt(0).toUpperCase()
      });
      
      setOpen(false);
      toast({
        title: language === 'ar' ? 'تم التحديث!' : 'Profile Updated!',
        description: language === 'ar' ? 'تم حفظ تغييراتك بنجاح.' : 'Your changes have been saved successfully.',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: error.message || (language === 'ar' ? 'فشل في حفظ التغييرات' : 'Failed to save changes'),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="luxury-button">
          <Edit className="w-4 h-4 mr-2" />
          {t('editProfile')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>{t('editProfile')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {formData.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'تغيير الصورة' : 'Change Photo'}
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            <Label htmlFor="username">{t('username')}</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">{t('country')}</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1" disabled={saving}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" className="luxury-button flex-1" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'ar' ? 'جارٍ الحفظ...' : 'Saving...'}
                </>
              ) : (
                language === 'ar' ? 'حفظ' : 'Save'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}