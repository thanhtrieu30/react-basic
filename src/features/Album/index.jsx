import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'V-Pop Girl Power',
            url: 'https://avatar-ex-swe.nixcdn.com/playlist/2022/05/13/0/3/2/0/1652409851196_300.jpg'
        },
        {
            id: 2,
            name: 'Rock Việt Gây Nghiện',
            url: 'https://avatar-ex-swe.nixcdn.com/playlist/2022/04/22/8/a/c/d/1650618364088_300.jpg'
        },
        {
            id: 3,
            name: 'Nhạc TikTok Remix Gây Nghiện Hay Nhất Hiện Nay',
            url: 'https://avatar-ex-swe.nixcdn.com/playlist/2022/04/29/b/a/8/6/1651224384070_300.jpg'
        }
    ]

    return (
        <div>
            <h2>MỚI CẬP NHẬT</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;