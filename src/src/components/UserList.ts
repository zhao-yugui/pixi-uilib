import { Container } from 'pixi.js';
import { UserCard, type UserCardOptions } from './UserCard';

export class UserList extends Container {
  private cards: UserCard[] = [];
  private gap: number = 20;

  constructor() {
    super();
  }

  addUser(options: UserCardOptions) {
    const card = new UserCard(options);
    const yPosition = this.cards.length * (card.height + this.gap);
    card.position.set(0, yPosition);
    this.cards.push(card);
    this.addChild(card);
    return card;
  }

  removeUser(index: number) {
    if (index >= 0 && index < this.cards.length) {
      const card = this.cards[index];
      this.removeChild(card);
      this.cards.splice(index, 1);
      this.repositionCards();
    }
  }

  getCard(index: number): UserCard | undefined {
    return this.cards[index];
  }

  get cardCount(): number {
    return this.cards.length;
  }

  private repositionCards() {
    this.cards.forEach((card, index) => {
      card.position.y = index * (card.height + this.gap);
    });
  }
}
