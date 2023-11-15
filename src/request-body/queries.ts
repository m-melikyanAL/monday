import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../configs/requests";

const headers = {
  "Content-Type": "application/json",
};

export const mutationRequest = (options: {
  url: string;
  method: string;
  isAuth?: boolean;
  onSuccess?: (data: any) => void;
  params?: boolean;
  successCb?: (res: any) => void;
}) => {
  const { url, method, isAuth, onSuccess, params, successCb } = options;

  return {
    mutate: useMutation({
      mutationFn: async (body: object | { data: string }) => {
        const res = await apiRequest({
          url: params ? url + (body as { data: string }).data : url,
          body,
          headers,
          method,
          isAuth,
        });
        if (successCb) {
          successCb(res);
        }
        return res;
      },
      onSuccess,
    }),
  };
};

export const queryRequest = (options: {
  url: string;
  method: string;
  key: string;
  cb?: any;
  setBoardId?: any;
}) => {
  const { url, method, key, cb, setBoardId } = options;

  return useQuery({
    queryKey: [key],
    queryFn: async (body: object) => {
      const data = await apiRequest({
        url,
        body,
        headers,
        method,
        isAuth: true,
      });
      const boards = data?.data.boards;
      const board = data?.data.boards?.[boards.length - 1];
      cb && cb(board?.items_page?.items);
      setBoardId && setBoardId(board?.id);
      return data;
    },
  });
};
