import { Component, OnInit, ViewChild } from '@angular/core';
import { Lembrete } from '../../interfaces/lembrete';
import { LembreteService } from '../../services/lembrete.service';
import { ErrorMsgComponent } from 'src/app/compartilhado/error-msg/error-msg.component';
import { TouchSequence } from 'selenium-webdriver';



@Component({
  selector: 'app-lista-lembrete',
  templateUrl: './lista-lembrete.component.html',
  styleUrls: ['./lista-lembrete.component.css']
})
export class ListaLembreteComponent implements OnInit {

  public lembretes: Lembrete[];

  @ViewChild(ErrorMsgComponent, { static: true })
  errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService) { }



  ngOnInit() {

    this.getListaLembretes();
  }

  getListaLembretes() {
    this.lembreteService.getListaLembretes()
    .subscribe((lembretes: Lembrete[]) =>{ //CallBack de Sucesso 
      this.lembretes = lembretes;
  }, 
        () => { this.errorMsgComponent.setError('Falha ao buscar o lembrete');} ); //CallBack de Error
  }

  deletarLembretes(id: number) {
    this.lembreteService.deleteLembrete(id)
    .subscribe( () =>{ 
      this.getListaLembretes();
    }, () => { this.errorMsgComponent.setError('Falha ao deletar o lembrete');}); 
  }

  existemLembretes(): boolean{
    return this.lembretes && this.lembretes.length > 0;
  }

}
