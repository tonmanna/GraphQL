const express = require("express");
const graphQLExpress = require("express-graphql");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require('graphql');

const { getVideoById , getVideos , createVideo} = require('./data/data');
const { globalIdField } = require('graphql-relay');
const { nodeInterface, nodeField } = require("./data/node");

const videoType = new GraphQLObjectType({
    name : 'Video',
    description: 'A video on Egghead.io',
    fields:{
        id : globalIdField(),
        title:{
            type : GraphQLString,
            description : "Title of the video"
        },
        duration:{
            type : GraphQLInt,
            description : 'Duration of the video'
        },
        watched:{
            type : GraphQLBoolean,
            description : 'This video are watched'
        }
    },
    interfaces: [ nodeInterface ]
});
exports.videoType = videoType;

const videoInputType = new GraphQLInputObjectType({
    name : "VideoInput",
    description: "The root Mutaion Type.",
    fields:{
        title: {
            type: new GraphQLNonNull(GraphQLID),
            description: "Title of new video"
        },
        duration: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "duration of video"
        },
        released: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: "release yet?"
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        node: nodeField,
        videos : {
            type : new GraphQLList(videoType),
            description : "List of videos.",
            resolve: getVideos
        },
        video: {
            type: videoType,
            description : "my fist video call",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: "The id of the video"
                }
            },
            resolve: (_, args) => {
                return getVideoById(args.id);
            }
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description : 'The root Mutation type',
    fields:{
        createVideo:{
            type: videoType,
            args: {
                video: {
                 type: new GraphQLNonNull(videoInputType)
                }
            },
            resolve: (_,args) => {
                return createVideo(args.video)
            }
        }
    }
})


const schema = new GraphQLSchema({
    query : queryType,
    mutation : mutationType
});

let app = express();
app.use('/',graphQLExpress({
    schema : schema,
    graphiql : true
}));

app.listen(3000, (result,error) => {
    console.log("App Start......");
});
