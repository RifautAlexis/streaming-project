import { ResizeService } from './../../services/resize.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { StreamsPresenterComponent } from "./components/streams-presenter/streams-presenter.component";
import { StreamOverview } from './models/stream-overview';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    imports: [CommonModule, StreamsPresenterComponent],
    providers: [ResizeService],
})
export class HomePageComponent implements OnInit {
    private readonly resizeService = inject(ResizeService);

    imagesArray = computed(() => Array(this.resizeService.numberOfImages()).fill(0));

    streamsOverview = signal<StreamOverview[]>([
        {
            
    title: 'Stream Title 01',
    category: string,
    viewers: number,
    previewImage: string,
    streamerName: string,
    streamerAvatar: string,
    streamerUrl: string,
    tags: string[],
        }
    ]);
    titles = signal<{linkName: string, label: string}[]>([
        {linkName: 'Category01', label: 'Channels'},
        {linkName: 'Category02', label: 'Channels'},
        {linkName: 'Category03', label: 'Channels'},
        {linkName: 'Category04', label: 'Channels'},
        {linkName: 'Category05', label: 'Channels'},
    ]);

    ngOnInit(): void {
        this.resizeService.init();
        this.resizeService.onResize();
    }
}
