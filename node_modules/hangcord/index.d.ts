interface optionType{
  title?: string,
  color?: string,
  gameOverTitle?: string,
  timestamp?: boolean,
  words?: string[]
}

class HangmanGame{
  gameEmbed: any;
  inGame: boolean;
  word: string;
  guessed: any[];
  wrongs: number;
  options: optionType;
  
  constructor(options: optionType);
  
  public newGame(msg: string): void;
  public makeGuess(reaction: string): any;
  public gameOver(win: any): any;
  public getDescription(): string;
  public waitForReaction(): any;
  
  public setTitle(title: string): any;
  public setGameOverTitle(title: string): any;
  public setColor(color: string): any;
  public setTimestamp(): any;

  public setWords(words: string[]): any;
  public pushWords(words: string[]): any;
}

export default HangmanGame
