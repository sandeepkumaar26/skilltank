import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCourse, saveDraft, getCourses } from '@/lib/api/coursesApi';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useSaveDraft() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: saveDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}