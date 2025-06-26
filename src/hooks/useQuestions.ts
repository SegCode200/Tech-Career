import useSWR from 'swr';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuestions } from "../store/assessmentSlice";


const fetcher = () => axios.get(`https://tech-assessment-backend.onrender.com/api/question/get-all-questions`).then(res => res.data.questions);

export const useQuestions = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR('/api/questions', fetcher);

  useEffect(() => {
    if (data) {
      dispatch(setQuestions(data));
    }
  }, [data, dispatch]);

  return { questions: data, error, isLoading };
};



export function useUserResults(token: string | undefined) {
  const fetchers = (token: string) => axios.get(`https://tech-assessment-backend.onrender.com/api/assessement/userTraits/${token}`).then(res => res.data);
  const { data, error, isLoading } = useSWR(
    token ? `/api/assessement/${token}` : null,
   ()=> fetchers(token as string)
  );
  console.log("User Results:", data);
  return {
    results: data,
    isLoading,
    isError: error
  };
}