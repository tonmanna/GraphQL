let schema = buildSchema(`
    type Video {
        id : ID,
        title : String,
        duration : Int,
        watched : Boolean
    }
    type Query {
       video : Video,
       videos : [Video]
    }
    
    type Schema {
        query : Query
    }
`);

const videoA = {
    id : ()=> 1,
    title: ()=> 'A bar',
    duration: ()=> 1,
    watched : ()=> true
}

const videoB = {
    id : ()=> 2,
    title: ()=> 'B bar',
    duration: ()=> 2,
    watched : ()=> true
}

const videoC = {
    id : ()=> 3,
    title: ()=> 'C bar',
    duration: ()=> 3,
    watched : ()=> true
}

const videos = [videoA,videoB,videoC];

const resolvers = {
    video : () => ({
        id : ()=> 1,
        title: ()=> 'bar',
        duration: ()=> 180,
        watched : ()=> true
    }),
    videos : () => videos
};

const query = `
    query myFirstQuery { 
      videos {
               id,
               title
               duration
               watched
      }     
    }
`;

graphql(schema,query,resolvers)
    .then((result)=> console.log(result))
    .catch((error)=> console.log(error));
