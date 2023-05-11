import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../model/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.css']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.buttonText = "oh snaps !";
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === "oh snaps !") {
      this.faceSnap$=this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(()=> this.buttonText = "Yeah, je kiff!")
      );
     } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'jeKiff').pipe(
      tap(() => this.buttonText = "oh snaps !")
      );

    }

    }

}
