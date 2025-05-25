"use client";

import { LanyardWebsocket, useLanyard, Spotify, DiscordUser, Activity } from "react-use-lanyard";
import { FC } from "react";
import { FaCircle, FaCircleMinus, FaDiscord, FaMoon, FaSpotify } from "react-icons/fa6";
import { cn } from "~/lib/utils";
import { Sora } from 'next/font/google';
import { motion, AnimatePresence } from "framer-motion"; 

const sora = Sora({ subsets: ['latin'] });

type Status = 'online' | 'idle' | 'dnd' | 'offline';

interface StatusIconProps {
  status: Status;
  size?: number;
}

export const DiscordStatus: FC = () => {
  const { loading, status } = useLanyard({
    userId: "698195326766415872",
    socket: true,
  }) as LanyardWebsocket;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status && status.spotify ? (
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
    return <div className='flex relative overflow-hidden flex-col text-sm space-y-2 bg-muted text-muted-foreground p-2 px-4 rounded-lg border-2 font-normal'>
        <div className="flex gap-4 overflow-hidden z-10 py-2">
            <div className="relative">
                <img className="size-20 rounded-full" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt='pfp' />
                <StatusIcon status={status} />
            </div>
            <div className="space-y-1">
                <h3 className={cn(sora.className, "flex gap-2 items-center font-normal text-xl truncate overflow-hidden w-full text-primary")}>
                    {/* {spotify.song.slice(0, 20)}{spotify.song.length > 20 && '...'} */}
                    {user.global_name}
                    <FaDiscord />
                </h3>
                {activity && <h4 className="flex items-center gap-0.5 truncate overflow-hidden w-full">
                    <img className="size-6" src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.png`} />
                    {activity.assets?.large_text}
                </h4>}
                {activity && <h4 className="flex items-center gap-0.5 truncate overflow-hidden w-full">
                    <img className="size-6" src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.small_image}.png`} />
                    {activity.assets?.small_text}
                </h4>}
                {
                    !activity && <><h3 className={cn(sora.className, "font-normal text-xl truncate w-full text-muted-foreground/50")}>
                    Napping on the Job
                </h3>
                <p>
                    zzzz...
                </p>
                </>
                }
        </div>
        </div>
    </div>
}

function SongCard({spotify}:{ spotify: Spotify}){
    return <a target="_blank" href={`https://open.spotify.com/track/${spotify.track_id}`} className='flex relative overflow-hidden flex-col text-sm space-y-2 bg-muted text-muted-foreground p-2 px-4 rounded-lg border-2 font-normal'>
        <img className="size-full absolute blur-2xl opacity-25" src={spotify.album_art_url} alt={spotify.song} />
        <div className="flex justify-end z-10">
            <p className="flex items-center justify-between w-full">Listening to Spotify <FaSpotify className="text-[#1DB954]" size={16} /></p>
        </div>
        <div className="flex gap-3 overflow-hidden z-10 py-2">
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
    icon: <FaCircle />,
    color: '#43b581', // Online - green
  },
  idle: {
    icon: <FaMoon />,
    color: '#faa61a', // Idle - yellow
  },
  dnd: {
    icon: <FaCircleMinus />,
    color: '#f04747', // Do Not Disturb - red
  },
  offline: {
    icon: <FaCircle />,
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