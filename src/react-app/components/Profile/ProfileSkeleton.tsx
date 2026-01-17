import React from 'react';
import { Loader2 } from 'lucide-react';

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-brand-dark flex items-center justify-center">
    <Loader2 className="text-brand-primary animate-spin" size={48} />
  </div>
);

export default ProfileSkeleton;
