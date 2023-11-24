using AutoMapper;
using backend.Controllers.Dtos;
using backend.Models.Entities.Files;

namespace backend.Mapper;

public class FileMapper : Profile
{
    public FileMapper()
    {
        CreateMap<FileEntry, FileEntryDto>()
            .ForMember(x => x.CreatedTime, opts => opts.MapFrom(x => x.UploadedTime))
            .ForMember(x => x.UpdatedAt, opts => opts.MapFrom(x => x.UploadedTime));

        CreateMap<FileEntryCollection, FileEntryCollectionDto>();
    }
}