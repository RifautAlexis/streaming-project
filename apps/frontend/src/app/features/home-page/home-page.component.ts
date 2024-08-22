import { ResizeService } from './../../services/resize.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    imports: [CommonModule],
    providers: [ResizeService],
})
export class HomePageComponent implements OnInit {
    private readonly resizeService = inject(ResizeService);

    imagesArray = computed(() => Array(this.resizeService.numberOfImages()).fill(0));

    ngOnInit(): void {
        this.resizeService.init();
        this.resizeService.onResize();
    }
}
