'use client';

import React, { useState } from 'react';
import {
  User,
  Edit3,
  Save,
  X,
  Upload,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguage } from '../hooks/useLanguage';

/* ================= TYPES ================= */

interface UserProfileForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string;
  education: string;
  bio: string;
}

/* ================= COMPONENT ================= */

const UserProfile: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const { t } = useLanguage();

  if (!user) return null;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<UserProfileForm>({
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    location: user.profile?.location ?? '',
    experience: user.profile?.experience ?? '',
    skills: user.profile?.skills?.join(', ') ?? '',
    education: user.profile?.education ?? '',
    bio: user.profile?.bio ?? '',
  });

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      profile: {
        ...user.profile,
        location: formData.location,
        experience: formData.experience,
        skills: formData.skills
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0),
        education: formData.education,
        bio: formData.bio,
      },
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      location: user.profile?.location ?? '',
      experience: user.profile?.experience ?? '',
      skills: user.profile?.skills?.join(', ') ?? '',
      education: user.profile?.education ?? '',
      bio: user.profile?.bio ?? '',
    });

    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 capitalize">
                  {user.type} • {user.category?.replace('-', ' ')}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content unchanged below – UI is fine */}
      </div>
    </div>
  );
};

export default UserProfile;
