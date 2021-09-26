import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './post-detail.css'

const POST_DETAIL_URL = 'https://jsonplaceholder.typicode.com/posts/';

function PostDetail(props) {
  const { idPost } = useParams();
  const [loading, setLoading] = useState(true);
  const [postDetail, setPostDetail] = useState();

  useEffect(() => {
    let isCancel = false;
    setLoading(true);
    axios({
      method: 'GET',
      url: `${POST_DETAIL_URL}${idPost}`
    }).then((info) => {
      if (!isCancel) {
        console.log(info);
        setPostDetail(info.data);
        setLoading(false);
      }
    });
    return () => {
      isCancel = true;
    };
  }, []);

  return (
    <div className='post-detail'>
      <h1>Post Detail</h1>
      {loading ? (
        <div>{'LOADING...'}</div>
      ) : (
        <>
          <div>{`ID: ${postDetail.id}`}</div>
          <div>{`Title: ${postDetail.title}`}</div>
          <div>{`Body: ${postDetail.body}`}</div>{' '}
        </>
      )}
    </div>
  );
}

export default PostDetail;
