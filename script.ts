import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'joke',
  template: `
<div class="card card-block">
  <h4 class="card-title">{{data.setup}}</h4>
  <p class="card-text"
     [hidden]="data.hide">{{data.punchline}}</p>
  <a (click)="data.toggle()"
     class="btn btn-warning">Tell Me
  </a>
  <a (click)="delete()"
     class="btn btn-warning">Delete
  </a>
</div>
  `
})
class JokeComponent {
  @Input() data : object;
  @Output() deleteJoke = new EventEmitter<Joke>();

  delete() {
    this.deleteJoke.emit();
  }
}

@Component({
  selector: 'joke-listing',
  template: `
  <joke-form (jokeCreated)='addJoke($event)'></joke-form>
    <joke *ngFor="let j of jokes; let i = index;" [data]='j' (deleteJoke)='deleteJoke(i)'></joke>
  `
})
class JokeListComponent {
  jokes: Joke[]; 

  constructor() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Hello-me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
    ];
  }

  addJoke(joke){
    this.jokes.unshift(joke);
  }

  deleteJoke(from: number){
    let rest = this.jokes.slice((from) + 1 || this.jokes.length);
    this.jokes.length = from < 0 ? this.jokes.length + from : from;
    this.jokes.push.apply(this.jokes, rest);
  }
}

@Component({
  selector: 'joke-form',
  template: `
  <div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the setup"
           #setup>
  </div>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the punchline"
           #punchline>
  </div>
  <button type="button"
          class="btn btn-primary"
          (click)="createJoke(setup.value, punchline.value)">Create
</button>
</div>
  `
})

class JokeFormComponent{

  @Output() jokeCreated = new EventEmitter<Joke>();

  createJoke(setup: string, punchline: string){
    this.jokeCreated.emit(new Joke(setup, punchline));
  }

}


@Component({
  selector: 'my-app-mayank',
  template: `
    <joke-listing></joke-listing>
  `
})

class AppComponent {
  
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    JokeComponent,
    JokeListComponent,
    JokeFormComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule); 