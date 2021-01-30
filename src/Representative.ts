export class Representative {
  id: string
  name: string
  phone: string
  status: 'EX' | 'CURRENT'


  constructor(data: any) {
    this.name = data.name
    this.phone = data.phone
    this.id = data.id
    this.status = data.status
  }

  get waMe() {
    return (
      'https://wa.me/' + this.phone.replace(/[\s+()]/g, '').replace(/^0/, '49')
    )
  }

  copyNumber() {
    window.navigator.clipboard.writeText(this.formattedPhone)
  }

  get phoneLink() {
    return 'tel:' + this.phone
  }

  get formattedPhone() {
    const countryCode = this.phone.slice(0, 3)
    const firstPart = this.phone.slice(3, 7)
    const secondPart = this.phone.slice(7)
    return countryCode + ' ' + firstPart + ' ' + secondPart
  }
} 
