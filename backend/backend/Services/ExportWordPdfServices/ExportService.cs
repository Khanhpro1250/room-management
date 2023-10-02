using Aspose.Words;
using Aspose.Words.Reporting;
using backend.Services.CloudinaryServices;

namespace backend.Services.ExportWordPdfServices;

public class ExportService : IExportService
{
    private readonly IWebHostEnvironment _environment;
    private readonly ICloudinaryService _cloudinaryService;

    public ExportService(IWebHostEnvironment environment, ICloudinaryService cloudinaryService)
    {
        _environment = environment;
        _cloudinaryService = cloudinaryService;
    }

    public async Task<Document> ExportWord<T>(T input, string templateFile = null, string cloundinaryFileUrl = null)
    {
        Document document = null;
        if (cloundinaryFileUrl != null)
        {
            var imageBytes = await _cloudinaryService.DownloadAsStreamAsync(cloundinaryFileUrl);
            document = new Document(imageBytes);
        }
        else if (templateFile != null)
        {
            var templatePath = Path.Combine(_environment.ContentRootPath,
                Path.Combine("Templates", templateFile));
            document = new Document(templatePath);
        }

        var reportEngine = new ReportingEngine();
        FindAndReplaceDocument(input, document, reportEngine);
        return document;
    }

    private void FindAndReplaceDocument(object input, Document document, ReportingEngine reportingEngine)
    {
        var dictionary = input.GetType().GetProperties()
            .Select(x => new { Key = x.Name, Value = x.GetValue(input, null) ?? string.Empty }).ToList();
        var keys = dictionary.Select(x => x.Key).ToArray();
        var values = dictionary.Select(x => x.Value).ToArray();
        reportingEngine.BuildReport(document, values, keys);
    }
}