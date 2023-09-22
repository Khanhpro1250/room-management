using Aspose.Words;
using Aspose.Words.Reporting;

namespace backend.Services.ExportWordPdfServices;

public class ExportService : IExportService
{
    private readonly IWebHostEnvironment _environment;

    public ExportService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }
    
    public async Task<Document> ExportWord<T>(T input, string templateFile)
    {
        var templatePath = Path.Combine(_environment.ContentRootPath,
            Path.Combine("Templates", templateFile));
        var document = new Document(templatePath);
        var reportEngine = new ReportingEngine();
        FindAndReplaceDocument(input, document, reportEngine);
        return document;
    }

    private void FindAndReplaceDocument(object input, Document document, ReportingEngine reportingEngine)
    {
        var dictionary = input.GetType().GetProperties()
            .Select(x => new {Key = x.Name, Value = x.GetValue(input, null) ?? string.Empty}).ToList();
        var keys = dictionary.Select(x => x.Key).ToArray();
        var values = dictionary.Select(x => x.Value).ToArray();
        reportingEngine.BuildReport(document, values, keys);
    }
}