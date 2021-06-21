/// <reference path="../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'LCZG-mapa-nativo',
  templateUrl: './mapa-nativo.component.html',
  styleUrls: ['./mapa-nativo.component.scss']
})

export class MapaNativoComponent implements OnInit {

  @ViewChild('divMap') divMap:ElementRef;

  mapa:google.maps.Map;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        console.log(position);
        this.cargarMapa(position);
      });

    }else{
      console.log('Navegador no compatible');
    }
  }

  cargarMapa(position){
    const opciones={
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom:17,
      mapTypeId:google.maps.MapTypeId.HYBRID
    }

    this.mapa=new google.maps.Map(this.divMap.nativeElement,opciones);

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      animation: google.maps.Animation.DROP
    });

    markerPosition.setMap(this.mapa);


  }
}
