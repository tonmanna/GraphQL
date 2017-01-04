/**
 * Created by Worawut on 16/12/2559.
 */
const videoA = {
    id : '1',
    title: 'A bar',
    duration: 1,
    watched : true
}

const videoB = {
    id : '2',
    title: 'B bar',
    duration: 2,
    watched : true
}

const videoC = {
    id : '3',
    title: 'C bar',
    duration: 3,
    watched : true
}

const videos = [videoA,videoB,videoC];

const getVideoById = (id)=> new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id === id;
    });
    resolve(video);
});

const getVideos = ()=> new Promise((resolve) =>
    resolve(videos)
);

const createVideo = ({title,duration,released}) =>{
 const video = {
     id : (new Buffer(title,'utf8')).toString('base64'),
     title,
     duration,
     released
 }
 videos.push(video);
 return video;
};

const getObjectById = (type,id) => {
    const types = {
        video : getVideoById
    };
    return types[type](id);
}


exports.getVideos =  getVideos;
exports.getVideoById = getVideoById;
exports.createVideo = createVideo;
exports.getObjectById = getObjectById;