import React, {useEffect, useState} from "react";
export type TApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
}

export const useFetch = (url: string, method: string, body?: Object): TApiResponse => {
const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>('');
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const apiCall = async () => {
    setLoading(true);
    try {
        let response: any;
        if(method === 'GET'){
            response = await fetch(url)
        }
        else{
            response = await fetch(url, body)
        }
        const json = await response.json();
        setStatus(response.status);
        setStatusText(response.statusText);
        setData(json);

    }
    catch (error){
        setError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    apiCall();
  }, [])

  return {status, statusText, data, error, loading}
}