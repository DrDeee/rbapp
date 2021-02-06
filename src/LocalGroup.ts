import { Representative } from './Representative';
export class LocalGroup {
  allRepresentatives: Representative[]

  get representatives() {
    return this.allRepresentatives.filter((rep) => rep.status === 'CURRENT')
  }

  get exRepresentatives() {
    return this.allRepresentatives.filter((rep) => rep.status === 'EX')
  }

  name: string
  id: string
  buddy: any = null
  state: string
  poll = {
    reps: null,
    strike: null,
    whyNot: null,
    equipment: null,
    people: null,
    mobi: null,
    starter: null,
    binden: null,
  }

  constructor(data: any) {
    this.allRepresentatives = data.representatives.map(
      (rep: any) => new Representative(rep)
    )
    this.name = data.name
    this.id = data.id
    this.state = data.state
    // data.buddy is sometimes undefined, but we just want null
    this.buddy = data.buddy || null
    if (data.poll) {
      // TODO:
      this.poll = data.poll
    }
  }
} 
