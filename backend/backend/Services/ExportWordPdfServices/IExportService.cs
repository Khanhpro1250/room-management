using Aspose.Words;

namespace backend.Services.ExportWordPdfServices;

public interface IExportService
{
    public Task<Document> ExportWord<T>(T input, string templateFile);
}