var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".side-bar")
var conatiner = document.querySelector('.container')
var filter_conatiner = document.querySelector('.filter')

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-menu")
    conatiner.classList.toggle("large-container")
    filter_conatiner.classList.toggle("filter-container")
}

const Card = document.querySelector(".videos-container");

let api_key = "AIzaSyDWi1ibZg8n8m95xKqbOF67YLIduskdH9s";
let video_http = " https://www.googleapis.com/youtube/v3/videos?";
let channel_Url = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 150,
    regionCode: 'IN'
}))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item)
        });
    })
    .catch(err => console.log(err))

const getChannelIcon = (video_data) => {
    fetch(channel_Url + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data)
        })
}

const makeVideoCard = (data) => {
    Card.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${ data.id }'">
        <img src="${ data.snippet.thumbnails.high.url }" class="thumbnail" alt="">
        <div class="content">
            <img src="${ data.channelThumbnail }" class="profile" alt="">
            <div class="info">
                <h4 class="title">${ data.snippet.title }</h4>
                <p class="chanel-name">${ data.snippet.channelTitle }</p>
                 <p class="chanel-name">1.3M views 1 year ago</p>
            </div>
        </div>
    </div>
    `;
}


const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})

