"use client";

import { LanyardWebsocket, useLanyard, Spotify, DiscordUser, Activity } from "react-use-lanyard";
import { FC } from "react";
import { FaCircle, FaCircleMinus, FaDiscord, FaMoon, FaSpotify } from "react-icons/fa6";
import { cn } from "~/lib/utils";
import { Sora } from 'next/font/google';
import { motion, AnimatePresence } from "framer-motion"; 
import { Skeleton } from "~/components/ui/skeleton";

const sora = Sora({ subsets: ['latin'] });

type Status = 'online' | 'idle' | 'dnd' | 'offline';

interface StatusIconProps {
  status: Status;
  size?: number;
}

const DiscordStatusSkeleton = () => (
  <div className="flex relative overflow-hidden flex-col text-sm space-y-2  p-2 px-4 rounded-lg border-2 font-normal">
    <div className="flex gap-4 overflow-hidden z-10 py-2">
      <div className="relative">
        <Skeleton className="size-16 rounded-full" />
        <span className="absolute right-2 bottom-2 bg-background border-2 border-secondary-foreground/25 rounded-full translate-x-[50%] translate-y-[50%]">
          <Skeleton className="w-4 h-4 rounded-full" />
        </span>
      </div>
      <div className="space-y-1 w-full">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export const DiscordStatus: FC = () => {
  const { loading, status } = useLanyard({
    userId: "698195326766415872",
    socket: true,
  }) as LanyardWebsocket;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DiscordStatusSkeleton />
          </motion.div>
        ) : status && status.spotify ? (
          <motion.div
            key="song"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SongCard spotify={status.spotify} />
          </motion.div>
        ) : status ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileCard
              activity={status.activities[0]}
              status={status.discord_status}
              user={status.discord_user}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

function ProfileCard({user, status, activity}: {user: DiscordUser, status: Status, activity: Activity | undefined}){
    return <div className='flex relative overflow-hidden flex-col text-sm bg-muted text-muted-foreground py-2 px-3 rounded-lg border-2 font-normal'>
        <div className="flex gap-4 overflow-hidden z-10">
            <div className="relative">
                <img className="size-16 rounded-full" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt='pfp' />
                <StatusIcon status={status} />
            </div>
            <div className="">
                <h3 className={cn(sora.className, "flex gap-2 items-center font-normal text-xl truncate overflow-hidden w-full")}>
                    {user.global_name}&apos;s
                    <FaDiscord className="text-[#5865F2]" />
                    Status
                </h3>
                {activity && <h4 className="flex text-xs items-center gap-0.5 truncate overflow-hidden w-full">
                    {
                      activity.assets?.large_image && <img className="size-6" src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.png`} alt={activity.name} />}
                    {activity.assets?.large_text || `Playing '${activity.name}'`}
                </h4>}
                {
                    !activity && <><h3 className={cn(sora.className, "font-normal mt-1 truncate w-full text-muted-foreground/50")}>
                    Napping on the Job
                </h3>
                </>
                }
        </div>
        </div>
    </div>
}

function SongCard({spotify}:{ spotify: Spotify}){
    return <a target="_blank" rel="noreferrer" href={`https://open.spotify.com/track/${spotify.track_id}`} className='flex relative overflow-hidden flex-col text-sm bg-muted text-muted-foreground py-2 px-3 rounded-lg border-2 font-normal'>
        <img className="size-full absolute blur-2xl opacity-25" src={spotify.album_art_url} alt={spotify.song} />
        <div className="flex justify-end z-10 relative">
            <FaSpotify className="text-[#1DB954] size-5 absolute right-0 top-0" />
        </div>
        <div className="flex gap-3 overflow-hidden z-10 py-1">
            <img className="size-14 border-2 border-muted-foreground rounded-md" src={spotify.album_art_url} alt={spotify.song} />
            <div className="space-y-1">
                <h3 className={cn(sora.className, "font-normal text-xl truncate overflow-hidden w-full text-primary")}>
                    {spotify.song.slice(0, 20)}{spotify.song.length > 20 && '...'}
                </h3>
                <h4 className="truncate overflow-hidden w-full">
                    {spotify.artist.slice(0, 20)}{spotify.artist.length > 20 && '...'}
                </h4>
            </div>
        </div>
    </a>
}


const statusConfig: Record<Status, { icon: JSX.Element; color: string }> = {
  online: {
    icon: <FaCircle title="Online" />,
    color: '#43b581', // Online - green
  },
  idle: {
    icon: <FaMoon title="Idle" />,
    color: '#faa61a', // Idle - yellow
  },
  dnd: {
    icon: <FaCircleMinus title="Do Not Disturb" />,
    color: '#f04747', // Do Not Disturb - red
  },
  offline: {
    icon: <FaCircle title="Offline" />,
    color: '#747f8d', // Offline - gray
  },
};

const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 16 }) => {
  const { icon, color } = statusConfig[status];

  return (
    <span className="absolute right-2 bottom-2 bg-background border border-2 border-secondary-foreground/25 rounded-full translate-x-[50%] translate-y-[50%]" style={{ color, fontSize: size }}>
      {icon}
    </span>
  );
};
