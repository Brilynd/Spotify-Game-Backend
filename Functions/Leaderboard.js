async function LeaderboardExists (client,gameInfo){
    try{
        await client.connect();
        const response = await client.db('Spotify-Higher-Lower').collection('Freeplay').findOne({$and:[{ArtistID:gameInfo.ArtistID},{UserID:gameInfo.UserID}]})
        console.log(await response)
        if (await response!=null){
            return false
        }
        
        return true
    }
    catch(e){
        console.error(e)
    }
}


async function UpdateLeaderboard (client,gameInfo){
    try{
        await client.connect();
        if(await LeaderboardExists(client,gameInfo)){
            console.log('created')
            await client.db('Spotify-Higher-Lower').collection('Freeplay').insertOne({ArtistName:gameInfo.ArtistName,ArtistID:gameInfo.ArtistID,Score:gameInfo.Score,Username:gameInfo.Username,UserID:gameInfo.UserID},{upsert:true})
        }
        else{
            console.log('Adding Score')
            await client.db('Spotify-Higher-Lower').collection('Freeplay').updateOne({$and:[{ArtistID:gameInfo.ArtistID},{Score:{$lt:gameInfo.Score}}]},{$set:{Score:gameInfo.Score}})
        }
        

    }
    catch(e){
        console.error(e)
    }
}
module.exports = {UpdateLeaderboard}