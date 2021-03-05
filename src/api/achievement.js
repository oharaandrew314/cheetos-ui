export default class Achievement {
  constructor (id, name, description, hidden, icons, score, unlockedOn, unlocked) {
    if (!id) throw Error('id is undefined')
    if (!name) throw Error('name is undefined')

    this.id = id
    this.name = name
    this.description = description
    this.hidden = hidden
    this.icons = icons
    this.score = score
    this.unlockedOn = unlockedOn
    this.unlocked = unlocked
  }
}
