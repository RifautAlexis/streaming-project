import { Injectable, NgZone, signal, inject, OnDestroy } from '@angular/core';
import { debounceTime, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Injectable()
export class ResizeService implements OnDestroy {
  private readonly zone = inject(NgZone);

  private destroy$ = new Subject<void>();

  currentWindowWidth = signal<number>(window.innerWidth);
  numberOfImages = signal<number>(0);

  init(): void {
    this.getNumberOfImages(this.currentWindowWidth());
  }

  onResize(): void {
    // this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
        //   debounceTime(300),
          map((event: any) => event.target.innerWidth),
          takeUntil(this.destroy$)
        )
        .subscribe((width) => {
          this.zone.run(() => {
            this.currentWindowWidth.set(width);
            this.getNumberOfImages(this.currentWindowWidth());
            // if (window.innerWidth >= 1280) {
            //     console.log('desktops');
            //     this.getNumberOfImages();
            // } else if (window.innerWidth >= 1024) {
            //     console.log('laptops');
            //     this.getNumberOfImages();
            // } else if (window.innerWidth >= 768) {
            //     console.log('tablets');
            //     this.getNumberOfImages();
            // } else if (window.innerWidth < 684) {
            //     console.log('mobiles');
            //     this.getNumberOfImages();
            // }
          });
        // });
    });
  }

  private getNumberOfImages(currentWindowWidth: number): void {
    const imageWidth = 320; // Width of each image
    const imageMargin = 16; // Margin between images (space-x-4 in Tailwind CSS)
    const totalImageWidth = imageWidth + imageMargin;

    const windowWidth = currentWindowWidth - 200;
    const numberOfImages = Math.floor(windowWidth / totalImageWidth);
    this.numberOfImages.set(numberOfImages);
    console.log(numberOfImages, windowWidth, totalImageWidth);
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
