'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { User, Mail, Shield, Sparkles, LogOut, CheckCircle, Flame } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('Speaking Scholar');
  const [savedMsg, setSavedMsg] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        if (data.user.user_metadata?.full_name) {
          setName(data.user.user_metadata.full_name);
        } else if (data.user.email) {
          setName(data.user.email.split('@')[0]);
        }
      }
    }
    loadUser();
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg('Profile preferences updated!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <main className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <User className="w-8 h-8 text-indigo-500" />
          Profile & <span className="text-gradient">Settings</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account preferences, subscription status, and profile info
        </p>
      </div>

      {/* User Header Card */}
      <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {user?.email || 'learner@speakflow.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-amber-500" />
            3 Day Streak
          </div>
        </div>
      </Card>

      {/* Edit Profile Form */}
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Details</h3>

        {savedMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {savedMsg}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={user?.email || 'learner@speakflow.com'}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 text-sm cursor-not-allowed"
            />
          </div>

          <Button type="submit" size="sm">
            Save Changes
          </Button>
        </form>
      </Card>

      {/* Subscription Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Subscription Plan</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase">
            Active Free Freemium
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          You are currently on the Free Freemium plan (5 practice sessions / day). Upgrade to Pro for unlimited Gemini 1.5 feedback and PDF exports.
        </p>

        <Button variant="primary" size="sm">
          Upgrade to Pro ($12/mo)
        </Button>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 flex items-center justify-between border-rose-500/20 bg-rose-500/5">
        <div>
          <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">Sign Out</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log out of your SpeakFlow account session on this device
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </Card>
    </main>
  );
}
