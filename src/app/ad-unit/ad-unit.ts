import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const window: any;

@Component({
  selector: 'app-ad-unit',
  standalone: true,
  template: `
    <div class="ad-container">
      <ins class="adsbygoogle"
           style="display:block;"
           data-ad-client="ca-pub-6494834198989304"
           data-ad-slot="2976222517"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>
  `,
  styles: [`
    .ad-container {
      min-width: 300px;
      min-height: 250px;
      margin: 20px auto;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
  `]
})
export class AdUnit implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Wait for the page to be fully loaded
      if (document.readyState === 'complete') {
        this.initializeAdSense();
      } else {
        window.addEventListener('load', () => this.initializeAdSense());
      }
    }
  }
  private initializeAdSense() {
  try {
    console.log('Initializing AdSense...');
    
    // Check if adsbygoogle script is loaded
    if (typeof window.adsbygoogle === 'undefined') {
      console.warn('adsbygoogle is not defined. Make sure the AdSense script is loaded.');
      this.loadAdSenseScript();
      return;
    }

    // Initialize the adsbygoogle array if it doesn't exist
    window.adsbygoogle = window.adsbygoogle || [];
    
    // Find all ad containers that haven't been initialized yet
    const adContainers = Array.from(document.getElementsByClassName('adsbygoogle'))
      .filter(container => !container.hasAttribute('data-adsbygoogle-processed'));

    if (adContainers.length === 0) {
      console.log('No uninitialized ad containers found');
      return;
    }

    console.log(`Initializing ${adContainers.length} ad containers`);

    // Push ad configuration for each uninitialized container
    adContainers.forEach((container, index) => {
      try {
        window.adsbygoogle.push({});
        console.log(`AdSense initialized for container ${index}`);
      } catch (e) {
        console.error(`Error initializing AdSense for container ${index}:`, e);
      }
    });
  } catch (e) {
    console.error('Error in initializeAdSense:', e);
  }
}

  private loadAdSenseScript() {
    console.log('Loading AdSense script...');
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6494834198989304';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log('AdSense script loaded');
      this.initializeAdSense();
    };
    script.onerror = (error) => {
      console.error('Error loading AdSense script:', error);
    };
    document.head.appendChild(script);
  }
}