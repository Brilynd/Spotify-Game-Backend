//Searches for preexhisting user and if found it does not create a new user
async function CreateUser (client,userInfo){
    try{
        console.log(userInfo)
        await client.connect();
        await client.db('Spotify-Higher-Lower').collection('UserInfo').updateOne({UserID:userInfo.UserID},{$set:{Username:userInfo.Username,UserID:userInfo.UserID,Score:[]}},{upsert:true})

    }
    catch(e){
        console.error(e)
    }
}
//Adds current games final score to the Users score array to allow for the ability to see previous game data

async function AddUserScore(client,userInfo){
    try{
    await client.connect()
    await client.db('Spotify-Higher-Lower').collection('UserInfo').updateOne({UserID:userInfo.UserID},{$push:{Score:{Artist:userInfo.ArtistName,ArtistID:userInfo.ArtistID,Score:userInfo.Score}}})
    }
    catch(e){
        console.error(e)
    }
}

//Returns the users current scoreboard of previous game data

async function GetUserScoreboard(client,userInfo){
    try{
        await client.connect()
        const response = await client.db('Spotify-Higher-Lower').collection('UserInfo').findOne({UserID:userInfo.UserID})
        console.log(await response.Score)
        return await response.Score

    }
    catch(e){
        console.error(e)
    }
}
module.exports = {CreateUser,AddUserScore,GetUserScoreboard}