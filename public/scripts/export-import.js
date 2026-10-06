
// Export/Import functionality for Phanary
// This module handles exporting and importing atmospheres, tracks, and one-shots

const ExportImport = {
  // Export all data as JSON
  exportAll: function() {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      atmospheres: [],
      tracks: [],
      oneshots: []
    };

    // Get data from localStorage or global state
    if (typeof g !== 'undefined' && g.pm) {
      const pm = g.pm;
      if (pm.atmospheres) {
        data.atmospheres = pm.atmospheres.map(a => ({
          name: a.name,
          tags: a.tags,
          tracks: a.tracks ? a.tracks.map(t => ({
            id: t.id,
            volume: t.volume
          })) : [],
          oneshots: a.oneshots ? a.oneshots.map(o => ({
            id: o.id,
            volume: o.volume,
            minIndex: o.minIndex,
            maxIndex: o.maxIndex
          })) : []
        }));
      }
    }

    // Download as JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phanary-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Import data from JSON file
  importAll: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = JSON.parse(e.target.result);
          
          // Validate data structure
          if (!data.version || !data.exportDate) {
            throw new Error('Invalid export file format');
          }

          // Import into global state
          if (typeof g !== 'undefined' && g.pm) {
            const pm = g.pm;
            
            if (data.atmospheres && Array.isArray(data.atmospheres)) {
              data.atmospheres.forEach(atmosphere => {
                // Create atmosphere in database
                fetch('/system/api/atmospheres', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(atmosphere)
                }).catch(err => console.error('Failed to import atmosphere:', err));
              });
            }

            resolve({ success: true, message: 'Import completed successfully' });
          } else {
            reject(new Error('Player manager not available'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = function() {
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    });
  },

  // Export single atmosphere
  exportAtmosphere: function(atmosphere) {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      atmosphere: {
        name: atmosphere.name,
        tags: atmosphere.tags,
        tracks: atmosphere.tracks ? atmosphere.tracks.map(t => ({
          id: t.id,
          volume: t.volume
        })) : [],
        oneshots: atmosphere.oneshots ? atmosphere.oneshots.map(o => ({
          id: o.id,
          volume: o.volume,
          minIndex: o.minIndex,
          maxIndex: o.maxIndex
        })) : []
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phanary-atmosphere-${atmosphere.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Import single atmosphere
  importAtmosphere: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = JSON.parse(e.target.result);
          
          if (!data.atmosphere) {
            throw new Error('Invalid atmosphere export file');
          }

          // Create atmosphere in database
          fetch('/system/api/atmospheres', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.atmosphere)
          })
          .then(response => response.json())
          .then(result => {
            resolve({ success: true, message: 'Atmosphere imported successfully', data: result });
          })
          .catch(err => {
            reject(err);
          });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = function() {
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    });
  }
};

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExportImport;
} else {
  window.ExportImport = ExportImport;
}
