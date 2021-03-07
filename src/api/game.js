export default class Game {
  constructor (uid, name, displayImage, achievementsCurrent, achievementsTotal, lastUpdated) {
    if (!uid) throw new Error('UID is undefined')
    if (!name) throw new Error('Name is undefined')

    this.uid = uid
    this.platform = uid.platform
    this.id = uid.id

    this.name = name
    this.displayImage = displayImage
    this.achievementsTotal = achievementsTotal
    this.achievementsCurrent = achievementsCurrent

    this.lastUpdated = lastUpdated
  }

  completion () {
    if (this.achievementsTotal === 0) return undefined

    return this.achievementsCurrent / this.achievementsTotal
  }
}
