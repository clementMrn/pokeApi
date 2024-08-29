import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ctaButtonList= [
    { name: 'Pokedex', backgroundColor: '#46D7AB', shadowColor:'#2CDAB1', routing:"pokedex"},
    { name: 'Moves', backgroundColor: '#FC7F63', shadowColor:'#FA6555',routing:""},
    { name: 'Abilities', backgroundColor: '#77C4FE', shadowColor:'#429BED',routing:""},
    { name: 'Items', backgroundColor: '#FFCE4B', shadowColor:'#F6C747',routing:""},
    { name: 'Locations', backgroundColor: '#A06EB4', shadowColor:'#9F5BBA',routing:""},
    { name: 'Type Charts', backgroundColor: '#D1938C', shadowColor:'#B1736C',routing:""},
  ];

  articleList= [
    { title: 'Pokémon Rumble Rush Arrives Soon', date: '15 May 2019', image:'../assets/coverArticle1.png'},
    { title: 'Detective Pikachu Sleuths into Pokémon GO', date: '02 June 2019', image:'../assets/coverArticle2.png'},
    { title: 'Pokémon Rumble Rush Arrives Soon', date: '15 May 2019', image:'../assets/coverArticle1.png'},
    { title: 'Detective Pikachu Sleuths into Pokémon GO', date: '02 June 2019', image:'../assets/coverArticle2.png'},
  ];
}
