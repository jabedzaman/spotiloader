"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ISearch } from "@spotiloader/types";
import { api } from "~/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const validation = z.object({
  url: z.string().url("Invalid YouTube URL"),
});

export const CreateSearch: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState<ISearch | null>(null);
  const form = useForm({
    resolver: zodResolver(validation),
  });
  const onSubmit = async (values: z.infer<typeof validation>) => {
    setLoading(true);
    try {
      const search = await api.searches.create(values);
      setSearch(search);
    } catch (error) {
      console.error("failed to create search:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="enter track url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
      {search && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Search Created</h3>
          <p>Search ID: {search.id}</p>
          <p>Status: {search.status}</p>
          <p>Created At: {new Date(search.createdAt).toLocaleString()}</p>
        </div>
      )}
    </Form>
  );
};
