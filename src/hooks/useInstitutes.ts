import { 
  useGetInstitutesQuery, 
  useGetInstituteByIdQuery, 
  useCreateInstituteMutation, 
  useUpdateInstituteMutation, 
  useDeleteInstituteMutation 
} from '@/redux/api/instituteApi';
import type { CreateInstituteRequest, UpdateInstituteRequest } from '@/types/institute.type';
import { showToast } from '@/utils/toast';
import { useCallback } from 'react';

export const useInstitutes = () => {
  const { data: institutes, isLoading: isFetching, error: fetchError } = useGetInstitutesQuery();
  const [createInstitute, { isLoading: isCreating }] = useCreateInstituteMutation();
  const [updateInstitute, { isLoading: isUpdating }] = useUpdateInstituteMutation();
  const [deleteInstitute, { isLoading: isDeleting }] = useDeleteInstituteMutation();

  const handleCreate = useCallback(async (data: CreateInstituteRequest) => {
    try {
      await createInstitute(data).unwrap();
      showToast.success('Institute created successfully');
      return true;
    } catch (error: any) {
      showToast.error(error?.data?.message || 'Failed to create institute');
      return false;
    }
  }, [createInstitute]);

  const handleUpdate = useCallback(async (data: UpdateInstituteRequest) => {
    try {
      await updateInstitute(data).unwrap();
      showToast.success('Institute updated successfully');
      return true;
    } catch (error: any) {
      showToast.error(error?.data?.message || 'Failed to update institute');
      return false;
    }
  }, [updateInstitute]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this institute?')) {
      try {
        await deleteInstitute(id).unwrap();
        showToast.success('Institute deleted successfully');
        return true;
      } catch (error: any) {
        showToast.error(error?.data?.message || 'Failed to delete institute');
        return false;
      }
    }
    return false;
  }, [deleteInstitute]);

  return {
    institutes,
    isFetching,
    fetchError,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleDelete
  };
};

export const useInstitute = (id: string) => {
  const { data: institute, isLoading, error } = useGetInstituteByIdQuery(id, { skip: !id });
  return { institute, isLoading, error };
};
