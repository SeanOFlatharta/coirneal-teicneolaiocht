import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>About Us</h2>
      <br>
      <br>
      <p>This is a simple website to demonstrate HTML, CSS, and JavaScript.</p>
      <br>
      <p>The objective of this page is to be a One-Stop-Shop for all documentation and developer content I am currently working on along with Blogs on different projects etc</p>
      <br>
      <br>
      <div class="image-container">
        <img src="assets/flaherty_crest.jpg" alt="Flaherty Crest">
      </div>
    </section>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

}