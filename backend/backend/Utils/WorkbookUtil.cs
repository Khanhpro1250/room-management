using Aspose.Words;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace backend.Utils;

public static class WorkbookUtil
{
    public static FileStreamResult DocumentToFileStream(Document workbook,string fileName = "document.docx")
    {
        var returnStream = new MemoryStream();
        var extensions = GetExtension(fileName);
        var fileFormat = FileFormatUtil.ExtensionToSaveFormat(extensions);
        workbook.Save(returnStream, fileFormat);
        returnStream.Position = 0;
        var contentTypeProvider = new FileExtensionContentTypeProvider();
        contentTypeProvider.TryGetContentType(fileName, out var contentType);
        var defaultContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        var fileStreamResult = new FileStreamResult(returnStream, contentType ?? defaultContentType);

        fileStreamResult.FileDownloadName = fileName;
        return fileStreamResult;
    }
    
    private static string GetExtension(string path)
    {
        if (string.IsNullOrWhiteSpace(path))
            return null;
        int startIndex = path.LastIndexOf('.');
        return startIndex < 0 ? null : path.Substring(startIndex);
    }
}