import React, { useEffect } from 'react';
import styles from './GalleryContent.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createLike, deleteLike } from '../../api/galleryApi';


const GalleryContent = ({ isLogin, userinfo, exhibition, gallerySelect, handleModal }) => {

  // 랜더링 해야할 데이터: 썸네일, 타이틀, 전시시작일, 전시마감일, (로그인 했다면) 전시회를 좋아요 했는지 안 했는지, 좋아요 개수
  // exhibition.images[0].img
  // exhibition.title
  // exhibition.start_date
  // exhibition.end_date
  // exhibition.likes (배열)
  // exhibition.likes.length(좋아요 개수)
  
  const [isLiked, setLiked] = useState(false);
  
  useEffect(()=> {
    if(isLogin){
      // const likeArr = exhibition.likes.filter(el => userinfo.id === el.user_id) 
      // if(likeArr.length ===1){ //유저가 해당 gallerycontent컴포넌트를 좋아요 한 것일 때
      //   setLiked(true);
      // } else{
      //   setLiked(false); //유저가 해당 gallerycontent컴포넌트를 좋아요 한 게 아닐 때
      // }
      console.log('썸네일 컴포넌트 랜더링 useEffect')
    }
  }) //의존성 배열 두면 안 됨.

  const handleLike = () => { //로그인 한 사람들에게만 작동. 
    if(isLiked){// 좋아요 해제
      deleteLike();
      setLiked(false);
    } else{ //좋아요
      createLike();
      setLiked(true);
    }
  }
  
  if(isLogin){ // 로그인했다면? 좋아요를 했는지 안했는지에 따라서 하트 다르게 랜더링. 좋아요 클릭시 좋아요/좋아요 해제 가능
    return(
      <>
        <li className={styles.object}>

          <Link to='/gallerydetail'>
            <div className={styles.layer}
            //onClick={()=>gallerySelect(exhibition)}
            ></div>
            <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          </Link>

          <span className={styles.title}>데이비드 호크니展</span>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
          
          <div className={styles.likesMeta} onClick={handleLike}>
            {isLiked ? 
            <span className={styles.like}><i class="fas fa-heart"></i></span> : 
            <span className={styles.notlike}><i class="far fa-heart"></i></span>}
            {/*  */}
            <span className={styles.likesCount}>N</span>
          </div>

        </li>
      </>
    )
  } else{ // 로그인 안 했다면? 좋아요 default 회색하트 랜더링. 클릭 시 로그인해주세요 모달창 띄우기
    return (
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <div className={styles.layer}
          //onClick={()=>gallerySelect(exhibition)}
          ></div>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
        </Link>
        <span className={styles.title}>데이비드 호크니展</span>
        <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        
        <div className={styles.likesMeta} onClick={handleModal}>
          <span className={styles.notlike}><i class="far fa-heart"></i></span>
          <span className={styles.likesCount}>N</span>
        </div>

      </li>
    )
  }
}

export default GalleryContent;