import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './posts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GET_POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const TYPES_SORT_ARR = ['(NONE)', 'ASC', 'DES'];
let timeClick = 0;

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('posts render', posts);
  console.log(TYPES_SORT_ARR[timeClick % 3]);
  useEffect(() => {
    let isCancel = false;
    setLoading(true);
    axios({
      method: 'GET',
      url: GET_POST_URL
    }).then((res) => {
      if(!isCancel){

        setPosts(res.data);
        setLoading(false);
      }
    });
    // handle loading
    return () => {isCancel = true}
  }, []);

  const onClickSortHandle = () => {
    console.log('click sort');
    console.log(timeClick);
    timeClick++;
    let newPost = posts;
    if (timeClick % 3 === 0) {
      console.log('module 1');
      newPost = [
        ...posts.sort((post1, post2) => {
          if (post1.id < post2.id) {
            return -1;
          }
          if (post1.id > post2.id) {
            return 1;
          }
          return 0;
        })
      ];

      console.log(newPost);
    }
    if (timeClick % 3 === 1) {
      console.log('module 1');
      newPost = [
        ...posts.sort((post1, post2) => {
          if (post1.title < post2.title) {
            return -1;
          }
          if (post1.title > post2.title) {
            return 1;
          }
          return 0;
        })
      ];

      console.log(newPost);
    }
    if (timeClick % 3 === 2) {
      console.log('module 2');
      newPost = [
        ...posts.sort((post1, post2) => {
          if (post1.title > post2.title) {
            return -1;
          }
          if (post1.title < post2.title) {
            return 1;
          }
          return 0;
        })
      ];
      console.log(newPost);
    }

    setPosts(newPost);
  };

  const onRemoveHandle = (idPost) => {
    const newPosts = posts.filter((post) => {
      return post.id !== idPost;
    });
    setPosts(newPosts);
  };

  return (
    <div className='posts'>
      <h1>{'Posts'}</h1>
      {loading ? (
        <div> {'LOADING...'} </div>
      ) : (
        <div className='content'>
          <input type='text' placeholder='Search by title' />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th onClick={onClickSortHandle}>{`Title -- Sort ${
                  TYPES_SORT_ARR[timeClick % 3]
                }`}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>
                    <Link to={`/post/${post.id}`}>View detail</Link>{' '}
                    <button onClick={() => onRemoveHandle(post.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Posts;
