import { Component, input, OnInit } from '@angular/core';
import { StreamOverview } from '../../models/stream-overview';

@Component({
    selector: 'app-streams-presenter',
    standalone: true,
    templateUrl: './streams-presenter.component.html',
})
export class StreamsPresenterComponent {
    streams = input.required<StreamOverview[]>();
    title = input.required<{link: string, linkName: string, label: string}>();
}
