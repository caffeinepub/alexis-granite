import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Inquiry, UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (inquiry: Inquiry) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInquiry(inquiry);
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !actorFetching,
  });
}
