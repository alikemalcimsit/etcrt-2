const SitemapGenerator = require('sitemap-generator');

// Site haritası oluşturmak için bir generator örneği oluşturun
const generator = SitemapGenerator('https://www.ferrantericci.com', {
  filepath: './public/sitemap.xml',
  maxEntriesPerFile: 5000,
  stripQuerystring: false
});

// Generator'ı başlatın
generator.start();

generator.on('done', () => {
  console.log('Sitemap oluşturuldu ve ./public/sitemap.xml dosyasına kaydedildi.');
});

generator.on('error', (error) => {
  console.error('Sitemap oluşturulurken bir hata oluştu:', error);
});
