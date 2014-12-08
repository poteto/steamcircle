var interfaces = {
  user: {
    name: 'ISteamUser',
    methods: {
      summary: {
        endpoint: 'GetPlayerSummaries',
        version: 2
      },
      friends: {
        endpoint: 'GetFriendList',
        version: 1
      },
      vanity: {
        endpoint: 'ResolveVanityURL',
        version: 1
      }
    }
  },
  stats: {
    name: 'ISteamUserStats',
    methods: {
      achievements: {
        endpoint: 'GetPlayerAchievements',
        version: 1
      },
      gameStats: {
        endpoint: 'GetUserStatsForGame',
        version: 2
      },
      schema: {
        endpoint: 'GetSchemaForGame',
        version: 2
      },
      globalAchievements: {
        endpoint: 'GetGlobalAchievementPercentagesForApp',
        version: 2
      },
      globalStats: {
        endpoint: 'GetGlobalStatsForGame',
        version: 1
      }
    }
  },
  player: {
    name: 'IPlayerService',
    methods: {
      games: {
        endpoint: 'GetOwnedGames',
        version: 1
      },
      recentlyPlayed: {
        endpoint: 'GetRecentlyPlayedGames',
        version: 1
      },
      isPlayingSharedGame: {
        endpoint: 'IsPlayingSharedGame',
        version: 1
      }
    },
    news: {
      name: 'ISteamNews',
      newsForApp: {
        endpoint: 'GetNewsForApp',
        version: 2
      }
    }
  }
};

module.exports = interfaces;
