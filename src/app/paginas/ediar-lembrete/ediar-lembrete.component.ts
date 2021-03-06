import { Component, ViewChild } from '@angular/core';
import { ErrorMsgComponent } from '..//..//compartilhado/error-msg/error-msg.component';
import { LembreteService } from '..//..//services/lembrete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lembrete } from '..//..//interfaces/lembrete';

@Component({
  selector: 'app-ediar-lembrete',
  templateUrl: './ediar-lembrete.component.html',
  styleUrls: ['./ediar-lembrete.component.css']
})
export class EdiarLembreteComponent {
//

  public lembrete : Lembrete;
  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService, private router: Router, private activatedRout: ActivatedRoute) {
    this.getLembrete(this.activatedRout.snapshot.params.id)
  }

  //Método pega o id passado pela URL que faz uma requisição na API e pedir que ela busque o lembrete, ou seja, vamos carregar no atubuto lembrete o lembrete requisitado na API
  getLembrete(id: number){
    this.lembreteService.getLembrete(id)
    .subscribe((lembrete: Lembrete) => {
      this.lembrete = lembrete;
    }, () => {this.errorMsgComponent.setError('Falha ao buscar lembrete')});
  }

  atualizaLembrete(lembrete: Lembrete): void{
    this.lembreteService.atualizaLembrete(lembrete)
    .subscribe(
      () => {this.router.navigateByUrl('/')},
      (): void => {this.errorMsgComponent.setError('Falha ao atualizar lembrete')}
    );
  }

}
