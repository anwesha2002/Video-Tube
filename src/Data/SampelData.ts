// // Sample JSON for /videos endpoint, paginated with 20 items
//
// const videoItem = [
//     {
//         "kind": "youtube#video",
//         "etag": "etag_value",
//         "id": "video_id_1",
//         "snippet": {
//             "publishedAt": "2023-09-29T00:00:00Z",
//             "channelId": "channel_id_1",
//             "title": "Video Title 1",
//             "description": "Video description 1",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://example.com/thumbnail1.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://example.com/thumbnail1.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://example.com/thumbnail1.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Channel Title 1",
//             "tags": ["tag1", "tag2"],
//             "categoryId": "22",
//             "liveBroadcastContent": "none",
//             "localized": {
//                 "title": "Localized Title 1",
//                 "description": "Localized description 1"
//             }
//         },
//         "contentDetails": {
//             "duration": "PT10M34S",
//             "dimension": "2d",
//             "definition": "hd",
//             "caption": "false",
//             "licensedContent": true,
//             "projection": "rectangular"
//         },
//         "statistics": {
//             "viewCount": "123456",
//             "likeCount": "4567",
//             "dislikeCount": "123",
//             "favoriteCount": "0",
//             "commentCount": "89"
//         }
//     }
// ]
// const repeat = (arr , n) => [].concat(...Array(n).fill(arr));
//
// export const videosResponse = {
//     "kind": "youtube#videoListResponse",
//     "etag": "etag_value",
//     "nextPageToken": "CAUQAA",
//     "prevPageToken": (Math.random() * 10000).toString(),
//     "pageInfo": {
//         "totalResults": 200,
//         "resultsPerPage": 20
//     },
//     "items": repeat(videoItem, 20)
// };
//
//
//
// // Sample JSON for /search by keyword endpoint
// export const searchResponse = {
//     "kind": "youtube#searchListResponse",
//     "etag": "etag_value",
//     "nextPageToken": "CAoQAA",
//     "prevPageToken": "CAAQAA",
//     "regionCode": "US",
//     "pageInfo": {
//         "totalResults": 1000000,
//         "resultsPerPage": 20
//     },
//     "items": [
//         {
//             "kind": "youtube#searchResult",
//             "etag": "etag_value",
//             "id": {
//                 "kind": "youtube#video",
//                 "videoId": "video_id_1"
//             },
//             "snippet": {
//                 "publishedAt": "2023-09-29T00:00:00Z",
//                 "channelId": "channel_id_1",
//                 "title": "Search Result Video Title 1",
//                 "description": "Search result video description 1",
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 120,
//                         "height": 90
//                     },
//                     "medium": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 320,
//                         "height": 180
//                     },
//                     "high": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 480,
//                         "height": 360
//                     }
//                 },
//                 "channelTitle": "Search Result Channel Title 1",
//                 "liveBroadcastContent": "none",
//                 "publishTime": "2023-09-29T00:00:00Z"
//             }
//         },
//         {
//             "kind": "youtube#searchResult",
//             "etag": "etag_value",
//             "id": {
//                 "kind": "youtube#video",
//                 "videoId": "video_id_2"
//             },
//             "snippet": {
//                 "publishedAt": "2023-09-28T00:00:00Z",
//                 "channelId": "channel_id_2",
//                 "title": "Search Result Video Title 2",
//                 "description": "Search result video description 2",
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://example.com/thumbnail2.jpg",
//                         "width": 120,
//                         "height": 90
//                     },
//                     "medium": {
//                         "url": "https://example.com/thumbnail2.jpg",
//                         "width": 320,
//                         "height": 180
//                     },
//                     "high": {
//                         "url": "https://example.com/thumbnail2.jpg",
//                         "width": 480,
//                         "height": 360
//                     }
//                 },
//                 "channelTitle": "Search Result Channel Title 2",
//                 "liveBroadcastContent": "none",
//                 "publishTime": "2023-09-28T00:00:00Z"
//             }
//         }
//         // ...more items (20 items total)
//     ]
// };
//
// export const commentThreadsResponse = {
//     "kind": "youtube#commentThreadListResponse",
//     "etag": "etag_value",
//     "nextPageToken": "CAEQAA",
//     "pageInfo": {
//         "totalResults": 100,
//         "resultsPerPage": 20
//     },
//     "items": repeat([
//         {
//             "kind": "youtube#commentThread",
//             "etag": "etag_value",
//             "id": "comment_thread_id_1",
//             "snippet": {
//                 "videoId": "video_id_1",
//                 "topLevelComment": {
//                     "kind": "youtube#comment",
//                     "etag": "etag_value",
//                     "id": "comment_id_1",
//                     "snippet": {
//                         "authorDisplayName": "User 1",
//                         "authorProfileImageUrl": "https://example.com/profile1.jpg",
//                         "authorChannelUrl": "https://www.youtube.com/channel/channel_id_1",
//                         "authorChannelId": {
//                             "value": "channel_id_1"
//                         },
//                         "textOriginal": "This is a sample top-level comment 1",
//                         "textDisplay": "This is a sample top-level comment 1",
//                         "likeCount": 10,
//                         "publishedAt": "2023-09-29T00:00:00Z",
//                         "updatedAt": "2023-09-29T00:00:00Z"
//                     }
//                 },
//                 "canReply": true,
//                 "totalReplyCount": 5,
//                 "isPublic": true
//             },
//             "replies": {
//                 "comments": [
//                     {
//                         "kind": "youtube#comment",
//                         "etag": "etag_value",
//                         "id": "reply_id_1",
//                         "snippet": {
//                             "authorDisplayName": "User 2",
//                             "authorProfileImageUrl": "https://example.com/profile2.jpg",
//                             "authorChannelUrl": "https://www.youtube.com/channel/channel_id_2",
//                             "authorChannelId": {
//                                 "value": "channel_id_2"
//                             },
//                             "textOriginal": "This is a sample reply 1",
//                             "textDisplay": "This is a sample reply 1",
//                             "likeCount": 3,
//                             "publishedAt": "2023-09-29T01:00:00Z",
//                             "updatedAt": "2023-09-29T01:00:00Z"
//                         }
//                     }
//                 ]
//             }
//         }
//     ], 20)
// };
//
// // Sample JSON for /subscriptions endpoint
// export const subscriptionsResponse = {
//     "kind": "youtube#subscriptionListResponse",
//     "etag": "etag_value",
//     "nextPageToken": "CAoQAA",
//     "pageInfo": {
//         "totalResults": 100,
//         "resultsPerPage": 20
//     },
//     "items": repeat([
//         {
//             "kind": "youtube#subscription",
//             "etag": "etag_value",
//             "id": "subscription_id_1",
//             "snippet": {
//                 "publishedAt": "2023-09-29T00:00:00Z",
//                 "title": "Sample Channel 1",
//                 "description": "This is a sample subscription",
//                 "resourceId": {
//                     "kind": "youtube#channel",
//                     "channelId": "channel_id_1"
//                 },
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 88,
//                         "height": 88
//                     },
//                     "medium": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 240,
//                         "height": 240
//                     },
//                     "high": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 800,
//                         "height": 800
//                     }
//                 },
//                 "channelTitle": "Sample Channel Title 1"
//             }
//         }
//     ], 20)
// };
//
// // Sample JSON for /channel by ID endpoint
// export const channelByIdResponse = {
//     "kind": "youtube#channelListResponse",
//     "etag": "etag_value",
//     "pageInfo": {
//         "totalResults": 1,
//         "resultsPerPage": 1
//     },
//     "items": repeat([
//         {
//             "kind": "youtube#channel",
//             "etag": "etag_value",
//             "id": "channel_id_1",
//             "snippet": {
//                 "title": "Sample Channel Title 1",
//                 "description": "This is a sample channel description",
//                 "publishedAt": "2010-06-09T00:00:00Z",
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 88,
//                         "height": 88
//                     },
//                     "medium": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 240,
//                         "height": 240
//                     },
//                     "high": {
//                         "url": "https://example.com/thumbnail1.jpg",
//                         "width": 800,
//                         "height": 800
//                     }
//                 },
//                 "country": "US"
//             },
//             "statistics": {
//                 "viewCount": "12345678",
//                 "subscriberCount": "1000000",
//                 "hiddenSubscriberCount": false,
//                 "videoCount": "500"
//             }
//         }
//     ], 1)
// };