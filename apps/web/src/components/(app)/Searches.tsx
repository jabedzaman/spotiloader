"use client";

import React from "react";
import moment from "moment";
import { useSwr } from "~/lib/swr";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import Image from "next/image";
import {
  Platform,
  SearchStatus,
  ISearch,
  ITrack,
  ICover,
} from "@spotiloader/types";
import { Schema } from "mongoose";

export const Searches: React.FC = () => {
  const { data: searches, isLoading } = useSwr.searches.list();

  const getStatusColor = (status: SearchStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "FAILED":
        return "bg-red-500";
      case "PROCESSING":
        return "bg-yellow-500";
      case "PENDING":
        return "bg-gray-500";
      default:
        return "bg-muted";
    }
  };

  const getPlatformColor = (platform: Platform) => {
    return platform === "YOUTUBE" ? "bg-red-600" : "bg-green-600";
  };

  const renderTrack = (
    track: string | ITrack | Schema.Types.ObjectId,
    i: number
  ) => {
    if (typeof track === "string" || track instanceof Schema.Types.ObjectId) {
      return;
    }
    const cover = track.covers[0] as ICover;
    return (
      <div key={track.id || i} className="flex gap-4 items-center border  p-3">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={track.title}
            width={60}
            height={60}
            className="object-cover"
          />
        ) : (
          <div className="w-[60px] h-[60px] bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            No Cover
          </div>
        )}
        <div className="flex flex-col">
          <p className="font-medium">{track.title}</p>
          {track.duration && (
            <p className="text-sm text-muted-foreground">⏱ {track.duration}s</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recent Searches</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[120px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {searches?.map((search: ISearch) => (
            <Card key={search.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-start">
                  <span>{search.type} Search</span>
                  <Badge className={getStatusColor(search.status)}>
                    {search.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground text-xs">
                  <p className="truncate">🔗 {search.url}</p>
                  <Badge className={getPlatformColor(search.platform)}>
                    {search.platform}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  📅 {moment(search.createdAt).fromNow()}
                </p>

                {search.tracks?.length > 0 ? (
                  <div className="space-y-2">
                    {search.tracks.map((track, i) => renderTrack(track, i))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tracks found
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
