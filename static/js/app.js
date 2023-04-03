samples_url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function drop_down_menu(){
    
let drop_down_menu=d3.select("#selDataset")

d3.json(samples_url).then((data) => {

console.log(data)
let names=data.names
names.forEach((element) => {
    console.log({ element });
    drop_down_menu.append("option")
    .text(element)
  });
  demo_table(names[0])
  plots(names[0])
})

}

function optionChanged(sample_id){
    demo_table(sample_id)
    plots(sample_id)


}

function demo_table(sample_id){

let demo_table=d3.select("#sample-metadata")
    d3.json(samples_url).then((data) => {

        console.log(data)
        let metadata=data.metadata
        result = metadata.filter(x => x.id == sample_id)[0];

demo_table.html("")

       
          Object.entries(result).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            demo_table.append("h5")
            .text(` ${key}: ${value}`)
          });


        
        })
}

function plots(sample_id){

    d3.json(samples_url).then((data) => {

        console.log(data)
        let samplesdata=data.samples
        result = samplesdata.filter(x => x.id == sample_id)[0];

        sample_values=result.sample_values

        otu_ids=result.otu_ids
        
        otu_labels=result.otu_labels


        var bardata = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map((index) => `otu ${index}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            name: 'SF Zoo',
            orientation: 'h',
            marker: {
              color: 'rgba(55,128,191,0.6)',
              width: 1
            },
            type: 'bar'
          }];
          
          
          
          var barlayout = {
            title: 'Colored Bar Chart',
          }
          
          Plotly.newPlot('bar', bardata, barlayout);

          var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              colorscale: 'Earth',
              size: sample_values
            }
          }];
          
          
          
          var bubblelayout = {
            title: 'Marker Size and Color',
            
          };
          
          Plotly.newPlot('bubble', bubbledata, bubblelayout);
        
        })

}




drop_down_menu()