import useSWR from 'swr';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuestions } from "../store/assessmentSlice";

const URL = "https://tech-assessment-backend.onrender.com/api"

const fetcher = (url: string) => axios.get(`https://tech-assessment-backend.onrender.com/api/question/get-all-questions`).then(res => res.data.questions);

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
